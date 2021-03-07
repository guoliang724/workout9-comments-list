//get inoformation from local
var datas = localStorage.getItem("comments");

//fake data
var fakeData = [
  {
    id: 0,
    avator: "./images/1.jpg",
    content: "this is a fake comment...",
  },
  {
    id: 1,
    avator: "./images/2.jpg",
    content: "you can add a comment too....",
  },
  {
    id: 2,
    avator: "./images/3.jpg",
    content: "we don't know who gives the comment",
  },
];

var data = datas === null ? fakeData : JSON.parse(datas);

render();
//render data into dom when uploading this page
function render() {
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `<li key=${data[i].id}>
    <img src=${data[i].avator} alt="" />
    <p>${data[i].content}?</p>
    <button onclick="delComment(${data[i].id})">x</button>
</li>`;
  }

  var ul = document.querySelector(".comment-list");
  ul.innerHTML = html;
}

//1. register an event
var postBtn = document.querySelector("#post-btn");

postBtn.onclick = function () {
  //get the input information
  var commentTxt = document.querySelector("#comment");
  if (commentTxt.value.trim() === "") {
    alert("please input comment");
    return;
  }
  var newComment = {
    id: RandomId(),
    avator: `./images/${Math.round(Math.random() * 26 + 1)}.jpg`,
    content: commentTxt.value,
  };
  data.unshift(newComment);
  //add it into localstorage
  localStorage.setItem("comments", JSON.stringify(data));
  //clear up the textarea
  commentTxt.value = "";
  //dom need to be refreshed
  render();
};

function delComment(id) {
  console.log("id", id);

  var index = data.findIndex((item, index) => item.id == id);
  if (index != -1) data.splice(index, 1);
  render();
}

//random id
function RandomId() {
  var index = Math.round(Math.random() * 300 + 3);
  for (var i = 0; i < data.length; i++) {
    if (data[i].id === index) RandomId();
  }
  return index;
}
