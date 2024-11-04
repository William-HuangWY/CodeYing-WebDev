export function clap() {
    window.alert("Thank you for your encouragement!")
}

export function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
}


(function(){
    emailjs.init({ publicKey: "aR6EqBUKi25iBkTma", });
})();
export function sendByEmailJS(name, from, msg) {
    let parms = {
        from_name: name,
        email_id: from,
        message: msg,
    }
    emailjs.send("service_vcsz4af", "template_nj225q1", parms).then(function (res) {
        alert(`Message Send! ${res.status}`);
    });
}
