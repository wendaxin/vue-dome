let obj = {}

// 获取评论数据
obj.getcomment = function () {
  return JSON.parse(window.sessionStorage.getItem('comment') || "false")
}

// 保存评论数据
obj.setcomment = function (i) {
  window.sessionStorage.setItem('comment',JSON.stringify(i))
}

// 添加评论数据
obj.addcomment = function (date,content,id) {
  var arr = this.getcomment(),
      item
  switch (String(id)) {
    case "1":
      item = "a"
      break
    case "2":
      item = "b"
      break
    case "3":
      item = "c"
      break
    default:
      item = "d"
  }

  arr[item].splice(0, 0, {
    user_name: "匿名用户",
    add_time: date,
    content: content
  })

  this.setcomment(arr)
}

// 获取购物车数据
obj.getshop = function () {
  return JSON.parse(window.sessionStorage.getItem('shopcart') || "false")
}

// 保存购物车数据
obj.setshop = function (i) {
  window.sessionStorage.setItem('shopcart',JSON.stringify(i))
}

// 添加购物车数据
obj.addshop = function (i) {
  var arr = this.getshop() || []

  let hasadd = arr.some(item=>{
    return item.id == i.id
  })
  if(hasadd){

    arr = arr.map(item=>{
      if(item.id == i.id){
        item.num+=i.num
      }
      return item
    })
  }else {
    arr.push(i)
  }

  this.setshop(arr)
}


export  default obj
