function downloadForm(content) {
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  let fileName = prompt("파일명을 입력해주세요. [기본값: cover.html]", "cover");
  if (fileName == null) return;
  a.download = fileName + ".html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// TODO 미완
function saveAsPdf() {
  const container = document.getElementById("editor");
  const content = container.innerHTML; // div의 HTML 내용을 가져옴

  const blob = new Blob([content], { type: "text/html" });
  const doc = new jsPDF("p", "mm", "a4");
  const url = URL.createObjectURL(blob);
  doc.URL = url;
  doc.save("cover.pdf");
}
let id = Number(0);
let isActive = false;

const availableTags = ["H1", "H2", "H3", "H4", "H5", "H6", "SPAN", "P", "A", "STRONG"];

function dragEvent() {
  const commonAncestor = window.getSelection().getRangeAt(0).commonAncestorContainer;
  let editorElement = getCurrentEditor();
  if (editorElement.contains(commonAncestor)) {
    let parentNode = commonAncestor.tagName == "SPAN" ? commonAncestor : commonAncestor.parentElement;
    while (!availableTags.includes(parentNode.tagName)) {
      parentNode = parentNode.parentElement;
    }
    let className = "autoCompleteField";
    if (parentNode.classList.contains(className)) {
      parentNode.classList.remove(className);
      parentNode.removeAttribute("id");
    } else {
      parentNode.classList.add(className);
      let nodeId = "V_" + id++;
      parentNode.setAttribute("id", nodeId);
    }
  }
}
function getCurrentEditor() {
  return document.getElementById("editor");
}

function toggleListener() {
  isActive = !isActive;
  let editorElement = getCurrentEditor();
  if (isActive) {
    editorElement.addEventListener("mouseup", dragEvent);
  } else {
    editorElement.removeEventListener("mouseup", dragEvent);
  }
}

const testData = [
  {
    id: "서버 데이터1",
    name: "John Doe 서버 데이터2",
    age: 30,
    email: "john.doe@example.com",
  },
];

//function : 서버 데이터 가져와서 v id 차례대로 text 대체
function variablesToText() {
  let editor = getCurrentEditor();
  let originalText = editor.innerHTML;
  let newText = originalText;
  const dataValues = Object.values(testData[0]);
  let children = Array.from(editor.querySelectorAll("*"))
    .filter((child) => child.hasAttribute("id"))
    //.map((child) => child.id.replace("V_", ""))
    .sort((a, b) => Number(a.id.replace("V_", "")) - Number(b.id.replace("V_", "")));
    console.log(children);
  // const size = Math.min(children.length, dataValues.length);
  // children.forEach((child, index) => {
  //   console.log("index: " + child.id);
  //   console.log("before: " + child.innerHTML);
  //   console.log("after:" + dataValues[index]);
  //   newText = newText.replace(child.innerHTML, dataValues[index]);
  //   //스타일 되돌리기
  //   if (index - 1 == size) {
  //     console.log("채울 수 있는 만큼 채움! 탈출!");
  //     return;
  //   }
  // });
  // console.log(newText);
  //console.log("다운로드 시작");
  //downloadForm(editor.innerHTML);
}
