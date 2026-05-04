  import { Route, Switch } from "wouter";
   import Index from "./pages/index";
   import Contact from "./pages/contact";
   import { Provider } from "./components/provider";
   import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

   function App() {
     return (
       <Provider>
         <Switch>
           <Route path="/" component={Index} />
           <Route path="/contact" component={Contact} />
         </Switch>                                                                                                        
         {/* Do not remove — off by default, activated by parent iframe via postMessage */}                                                  
         {import.meta.env.DEV && <AgentFeedback />}                                                                       
         
       </Provider>                                                                                                        
     );                                                                                                                   
   }                                                                                                                      
                                                                                                                          
   export default App; 