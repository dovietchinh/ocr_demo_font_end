console.log(React)
function App(){
    const [count,setCount] = React.useState(0)
    return (

        <div>asd</div>
    )
}
console.log(ReactDOM)
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(root)
App = React.createClass(App)
root.render(
    <React.StrictMode>
        <App />       
    </React.StrictMode>
);
// console.log(<React.StrictMode></React.StrictMode>)