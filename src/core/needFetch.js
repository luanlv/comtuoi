
export default function needFetch () {
  if(process.env.BROWSER && !window.firstTime) {
    console.log('first')
    window.firstTime = true
    return false
  }
  console.log('second')
  return true
}
