
//Variable declaration
let show=true;
const resultContent=document.getElementById("result");
const myInput=document.getElementById("searchText");
let errText=document.getElementById("errText");

//adding event listener for search without click search button
myInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchBtn").click();
    }
  });

  //asynchronous function for getting data from dictionary api
async function getData(){
    const searchWord=document.getElementById("searchText").value;
    if(searchWord==""){                         // checking empty search word
            errText.textContent="Type your search";
            show=true;
            clearOldElements();
        }
        else{
            errText.textContent="";
                const url=`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;   // dictionary api url stored in variable
                try{
                    const response= await fetch(url);       //fetching the data from dictionary api url
                    if(!response.ok){                       //check response with ok message
                        throw new Error(`Response Status : ${response.status}`);
                    }
                    else{                                   
                        const json=await response.json();   //storing json data in variable
                        showResult(json);                   //calling showResult function with json as argument
                        show=false
                    }
                }
                catch(error){                               //catch if error occurs
                    console.error(error);
                }               
        }
  }
//function for showing result in webpage
function showResult(json){
    if(!show){clearOldElements(); }
    //dynamically create html element for showing result
    let divEle=document.createElement("div");
    divEle.setAttribute("class","subs");
    divEle.innerHTML=`<p>
    <h3>Meaning : </h3>${json[0].meanings[0].definitions[0].definition}
    </p>`;
    resultContent.appendChild(divEle);
}  
//function for clear old values in webpage
function clearOldElements(){
    let div=document.getElementById("result"); 
    if(div.hasChildNodes()){
        div.removeChild(div.children[1]);
    }
}
