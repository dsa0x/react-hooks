//Module method
const React = (function(){
  let hooks = []
  let idx = 0
  function useState(initVal){
    const state = hooks[idx] || initVal;
    const _idx = idx
    const setState = newVal => {
      hooks[_idx] = newVal
    }
    idx++
    return [state,setState]
  }

  function render(Component){
    idx = 0
    const C = Component()
    C.render()
    return C
  }

  function useEffect(cb,depArr) {
    const oldDeps = hooks[idx]
    let hasChanged = true
    if (oldDeps) {
      hasChanged = oldDeps.some((dep,i) => !Object.is(dep,depArr[i]))
    }
    if (hasChanged) cb()
    hooks[idx] = depArr
    idx++

  }

  return {useState, render, useEffect}
})()


function Component(){
  const [count,setCount] = React.useState(0)
  const [text,setText] = React.useState("word")

  React.useEffect(()=> {
    console.log("ccss");
  },[])

  return {
    render: ()=> console.log({count,text}),
    click: () => setCount(count+1),
    type: (newVal) => setText(newVal),
  }
}

var App = React.render(Component);
App.click()
var App = React.render(Component);
App.click()
var App = React.render(Component);
App.type("ade")
var App = React.render(Component);





