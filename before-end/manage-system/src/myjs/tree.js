function tree(info, pid) {
    var data = [];
    for (let i in info) {
      if (info[i].pid == pid) {
        var obj = {
          value: info[i]._id,
          label: info[i].title,
          children: tree(info, info[i]._id)
        };
        //如果没有子权限，将子权限面板删除
        if(obj.children.length==0){
          delete obj.children;
        }
          data.push(obj);
      }
    }
    // console.log(data);
    return data;
  }

  export default tree;