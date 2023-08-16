
const apiUrlCreate = "https://url.api.stdlib.com/temporary@0.3.0/create/";
const apiUrlRemove = "https://url.api.stdlib.com/temporary@0.3.0/destroy/";

const createShortLink = (method_type, link, onCreateShortLink, teste, tempo) => {
  
  if(method_type === "REMOVE"){

    function obterFinalDaUrl(url) {
      if (url.startsWith("https://")) {
        url = url.slice("https://".length);
      } else if (url.startsWith("http://")) {
        url = url.slice("http://".length);
      }
      
      url = url.replace(/\/$/, '');
      
      const partes = url.split('/');
      const trechoFinal = partes[partes.length - 1];
      
      return trechoFinal;
    }

    const requestBody = {
      key: obterFinalDaUrl(link),
    };
  
    fetch(apiUrlRemove, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
  };

  
  if(method_type === "CREATE"){
    console.log("REQUEST FEITO");
    console.log(tempo);
    const requestBody = {
      url: link,
      ttl: parseInt(tempo)
    };
  
    fetch(apiUrlCreate, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        teste(data);
        onCreateShortLink(data["link_url"]);
        console.log(data);
      })
      .catch((error) => console.error(error));
  };
}

export default createShortLink;
