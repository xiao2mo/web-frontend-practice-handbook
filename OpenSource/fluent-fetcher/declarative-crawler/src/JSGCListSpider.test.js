import JSGCListSpider from "./JSGCListSpider.js";

let jsgcListSpider: JSGCListSpider = new JSGCListSpider([
  "http://ggzy.njzwfw.gov.cn/njggzy/jsgc/001001/001001001/001001001001/?Paging=1"
]);

jsgcListSpider.run().then(data=>{
  console.log(data);
});