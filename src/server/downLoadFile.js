import _Api from "@/server/api";
import { MessageBox } from "element-ui";

function downLoadFileFunc(pramas, fileName) {
  _Api
    .getFileFlow(pramas)
    .then(response => {
      let data = response.data;
      downLoad(data, fileName);
    })
    .catch(err => {
      MessageBox.alert(err.data.message, {
        showClose: false,
        confirmButton: "确定",
        customClass: "boxError"
      });
    });
}
function downLoad(data, fileName) {
  let blob = new Blob([data], {
    type: "application/octet-stream"
  });
  let filename = fileName || "filename.txt";
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    //   ie10，ie11
    window.navigator.msSaveBlob(blob, filename);
  } else {
    //   NOIE
    let blobURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", filename);
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}
export default downLoadFileFunc;


// 调用
// 引入：import downLoadFileFlow from "@/server/downLoadFile";

// // 下载文件 这个方法在server的api模板哪里
// downLodeFile (params) {
//   let obj = {
//     viewPath: params.url, //文件路径
//     groupName: params.groupName,
//     fileName: ""
//   };
//   downLoadFileFlow(obj, params.name);
// },
