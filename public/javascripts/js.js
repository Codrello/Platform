$(document).ready(function () {
    const bars = $(".fa-bars");
    const content = $(".content-wrapper");
    bars.on("click", () => {
        content.css("min-height", "1067px");
    })
    console.log(content);
    console.log(bars);
});