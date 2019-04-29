function artHtml(artId, data) {
  //删除模板
  var temp = document.getElementById(artId);
  var insteredDiv = document.createElement('div');
  insteredDiv.id = artId;
  if (temp) {
    insteredDiv.innerHTML =
      data && typeof data == 'object'
        ? template(artId, data)
        : template(artId, {});
    temp.before(insteredDiv);
    temp.parentNode.removeChild(temp);
  }
}
