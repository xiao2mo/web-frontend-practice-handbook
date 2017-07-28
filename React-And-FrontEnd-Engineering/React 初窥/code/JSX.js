

<div class="message">
    Hello World
</div>

render(h){
    return h(
        'div',
        { class: 'message'}
        ['Hello World']
    )
}



