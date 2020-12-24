const nav = document.querySelector('.navbar')
const navlist = document.querySelectorAll('.nav-item')
const services = document.querySelector('#services')
const contactUs = document.querySelector('#contact-us')
const contactCard = document.querySelector('.contact-us__card')
const sent = document.querySelector(".sent")
const form = document.querySelector("#contact-form")

let services_nav = document.querySelector('.nav-link[href="#services"]')
let contact_nav = document.querySelector('.nav-link[href="#contact-us"]')
let home_nav = document.querySelector('.nav-item')
let nav_toggle = document.querySelector('.navbar-toggler')

offsets = [services.offsetTop - 150, contactUs.offsetTop - 150]
nextOffsets = [services.nextElementSibling.offsetTop, contactUs.nextElementSibling.offsetTop]
navLinks = [services_nav, contact_nav]

const clear_nav = () => {
    navlist.forEach(item => {
        item.classList.remove('active')
    })
}

const show_sent = () => {
    sent.classList.add('show')
}

const shrink_form= () => {
    contactCard.classList.add("shrink")
}


document.addEventListener('DOMContentLoaded', function(){
    // check scroll location and update active nav link
    document.addEventListener('scroll', () => {
        if (scrollY > 60) {
            nav.classList.add('show-bg')
        } else {
            nav.classList.remove('show-bg')
        }

        for(let i=0; i < offsets.length; i++) {
            if(scrollY >= offsets[i] && scrollY < nextOffsets[i]) {
                clear_nav();
                navLinks[i].parentNode.classList.add('active')
            } else if(scrollY < offsets[0]) {
                clear_nav();
                home_nav.classList.add("active")
            }
        }


    })

    // make nav background white if nav is expanded
    nav_toggle.addEventListener('click',  ()=> {
        let expanded = nav_toggle.getAttribute('aria-expanded')

        // don't pay attention to this :D
        if (expanded === 'false') {
            nav.classList.add('show-bg-mob')
        } else {
            nav.classList.remove('show-bg-mob')
        }
    })

    // send issue details
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        emailjs.sendForm('contact_us_service', 'contact_us_form', this)
        .then(function(){
            shrink_form();
            show_sent();
        }, function(error) {
            console.log(error);
            console.log(this.name.value, this.phone.value, this.location.value, this.issue.value, this.description.value)
            alert('Failed...', error);
        })

    })

    // form.querySelector('input[type="submit"]').addEventListener('click', function(e) {
    //     e.preventDefault();

    //     shrink_form();
    //     show_sent();
    // })


})