```js
fetch('/big-data.csv')
  .then(function(response) {
    var reader = response.body.getReader();
    var partialCell = '';
    var returnNextCell = false;
    var returnCellAfter = 'Jake';
    var decoder = new TextDecoder();

    return search(reader);
  })
  .then(function(result) {
    console.log("Got the result! It's '" + result + "'");
  })
  .catch(function(err) {
    console.log(err.message);
  });
```

```js
function search(reader) {
  return reader.read().then(function(result) {
    partialCell += decoder.decode(result.value || new Uint8Array(), {
      stream: !result.done
    });

    // Split what we have into CSV 'cells'
    var cellBoundry = /(?:,|\r\n)/;
    var completeCells = partialCell.split(cellBoundry);

    if (!result.done) {
      // Last cell is likely incomplete
      // Keep hold of it for next time
      partialCell = completeCells[completeCells.length - 1];
      // Remove it from our complete cells
      completeCells = completeCells.slice(0, -1);
    }

    for (var cell of completeCells) {
      cell = cell.trim();

      if (returnNextCell) {
        reader.cancel('No more reading needed.');
        return cell;
      }
      if (cell === returnCellAfter) {
        returnNextCell = true;
      }
    }

    if (result.done) {
      throw Error('Could not find value after ' + returnCellAfter);
    }

    return search();
  });
}
```

```js
(function() {
  'use strict';

  const PI_URL = 'http://stuff.mit.edu/afs/sipb/contrib/pi/pi-billion.txt';

  const substring = document.querySelector('#substring');
  const bytes = document.querySelector('#bytes');
  const form = document.querySelector('#form');

  const output = document.querySelector('#output');
  const progress = document.querySelector('#progress');
  const progressText = document.querySelector('#progress-text');

  const encoder = new TextEncoder();

  let bytesValue = new Uint8Array();
  substring.addEventListener('input', function() {
    bytesValue = encoder.encode(substring.value);

    const bytesAsStrings = Array.prototype.map.call(bytesValue, function(b) {
      return `0x${b.toString(16)}`;
    });
    bytes.value = Array.prototype.join.call(bytesAsStrings, ' ');
  });

  let soFar;
  let contentLength;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    output.removeAttribute('hidden');

    progressText.textContent = 'Performing fetch...';

    fetch(`https://cors-anywhere.herokuapp.com/${PI_URL}`)
      .then(function(res) {
        soFar = 0;
        contentLength = res.headers.get('Content-Length');
        progress.max = contentLength;

        return pump(res.body.getReader());
      })
      .catch(function(e) {
        progressText.textContent = e;
      });
  });

  function pump(reader) {
    return reader.read().then(function(result) {
      if (result.done) {
        progressText.textContent = `All done! (${soFar} bytes total)`;
        return;
      }

      const chunk = result.value;

      soFar += chunk.byteLength;
      updateProgress();

      let found = -1;
      for (let i = 0; i < chunk.length; ++i) {
        if (chunk[i] === bytesValue[0]) {
          found = i;
          for (let j = 1; j < bytesValue.length; ++j) {
            if (chunk[i + j] !== bytesValue[j]) {
              found = -1;
              break;
            }
          }
        }

        if (found !== -1) {
          break;
        }
      }

      if (found !== -1) {
        progressText.textContent = `Found it! At position ${soFar -
          chunk.byteLength +
          found}.`;

        return reader.cancel();
      } else {
        return pump(reader);
      }
    });
  }

  function updateProgress() {
    progressText.textContent = contentLength
      ? `${soFar}/${contentLength} bytes received`
      : `${soFar} bytes received`;
    progress.value = contentLength ? soFar : null;
  }
})();
```
