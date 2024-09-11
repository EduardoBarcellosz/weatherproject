const apiKey ="a510d6f748149777617549e156ce784f";
const apiUrl="https://api.openweathermap.org/data/2.5/weather?units=metric";
const apiTimeUrl=`https://timeapi.io/api/time/current/coordinate?latitude=`;
function pesquisa(){
    var city=document.getElementById("input").value;
    verificaTempo(city);
}
async function verificaTempo(city) {
    try{
        const input = document.querySelector("input");
        input.classList.remove('vermelho');
        const resultado = await fetch(apiUrl+"&appid="+apiKey+"&q="+city);
        const dados= await resultado.json();
        if(dados.cod!=200){
            throw dados.cod;
        }
        var celcius=parseInt(dados.main.temp)+"°C";
        var cidade=dados.name;
        var humidade=dados.main.humidity+"%";
        var vento=dados.wind.speed+"km/h";
        var ceu=dados.weather[0].main;
        var lon=dados.coord.lon;
        var lat=dados.coord.lat;
        const resultadoTempo = await fetch(apiTimeUrl+lat+"&longitude="+lon);
        const dadosTempo= await resultadoTempo.json();
        var hour=dadosTempo.hour;
        if(hour>5&&hour<18){
            ceuImg(ceu);
        }else{
            nightImg(ceu);
        }
        document.getElementById("temp").innerHTML=celcius;
        document.getElementById("city").innerHTML=cidade;
        document.getElementById("humidity").innerHTML=humidade;
        document.getElementById("wind").innerHTML=vento;
        console.log(ceu);   
        console.log(dados);
    }catch(error){
        console.log("Erro " +error);
        input.classList.add('vermelho');
        input.value = "";
        input.placeholder = "Inexistent city";
    }
}
function reduzCloud(){
    document.getElementById("climai").src="Cloudy.svg";
    document.getElementById("dentro").style="background:linear-gradient(#576770,#668FA7);";
    document.getElementById("fora").style="background:linear-gradient(#576770,#668FA7);";
}

function ceuImg(ceu){
    switch(ceu){
        case "Clear":
            document.getElementById("climai").src="Sunday-Clear.svg";
            document.getElementById("dentro").style="background:linear-gradient(#5EB8ED,#E3EDF3);";
            document.getElementById("fora").style="background:linear-gradient(#5EB8ED,#E3EDF3);";
            break;
        case "Rain":
            document.getElementById("climai").src="RainDay.svg";
            document.getElementById("dentro").style="background:linear-gradient(#0C5E8E,#6A7274);";
            document.getElementById("fora").style="background:linear-gradient(#0C5E8E,#6A7274);";
            break;
        case "Clouds":
            reduzCloud();
            break;
        default:
            break;
    }
}

function nightImg(night){
    switch(night){
        case "Clear":
            document.getElementById("climai").src="MoonNight-Clear.svg";
            document.getElementById("dentro").style="background:linear-gradient(#06527E,#1D1B1B);";
            document.getElementById("fora").style="background:linear-gradient(#000304,#0C6AA0);";
            break;
        case "Rain":
            document.getElementById("climai").src="RainNight.svg";
            document.getElementById("dentro").style="background:linear-gradient(#082333,#060F38);";
            document.getElementById("fora").style="background:linear-gradient(#000304,#062436);";
            break;
        case "Clouds":
            reduzCloud();
            break;
        default:
            break;
    }
}