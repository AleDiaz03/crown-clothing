import NavBar from "./routes/navbar/navbar.component";
import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Authentication from './routes/authentication/authentication.component'
import {Routes, Route} from 'react-router-dom'



function App() {
  return (
    <Routes>
      <Route path='/' element ={<NavBar />}>
        <Route index element = {<Home />}></Route>
        <Route path='shop/*' element= {<Shop />}></Route>
        <Route path='auth' element= {<Authentication />}></Route>
        <Route path='checkout' element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
}

export default App;

/* shop/* the /* means that we know there might be another subsequent
route but whatever it as long as it is shop/ then render shop */

/* <Route path='/' element = {<Home />}></Route>
Lets break this down. Here we are saying that if the path (url) is 
/ meaning that we just landed on the page, we are in the home page,
we should render the element passed into element={} which in this 
case is our homepage. Makes sense right? We just landed in our 
page so url should be crwnclothing.com/   that / is what we are looking 
for*/

/*We use index when the child component should be
rendered in the same path as the father. For example 
the home page. The navbar is the parent but when we 
go into the website we should also see the home page
so the same path. Its like the sibling that renders first
in this case siblings are home and shop */

/* <OUtlet> is used when we want to render something
inside a componenet that depends on the path. Here
inside the navbar componenet we want to render home
or shop depending on the path so we use outlet inside the
navbar component */