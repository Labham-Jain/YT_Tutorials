function rgbfunc(){
    setInterval(function(){
        const rgbdiv = document.querySelector('.rgbdiv');
        let color1 = Math.floor(Math.random() * 255);
        let color2 = Math.floor(Math.random() * 255);
        let color3 = Math.floor(Math.random() * 255);
        console.log(color1, color2, color3);
        rgbdiv.style.background = `rgb(${color1},${color2},${color3})`;
    }, 1000);
}
In Next Part We Will Make This Happen With HEX Because As Per Analysis Rgb Is Slow As Compair To RGB