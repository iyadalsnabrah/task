//for post page
//when click on new-law-button append a new from-group
let i = 2
$('.new-law-button').click(function () {
    $('.new').append(`<div class="form-group"><label > محتوى المادة رقم ${i}</label><input type="text" class="form-control" name="content[content${i}]" required></div>`);
    i++;
})

//for clicked page
//add an animation delay to each clicked-law-body-content by 0.2
let delay = 0.5;
let count = 1;
var s = document.getElementsByClassName('clicked-law-body-content');
while (count <= s.length) {
    s[count - 1].style.animationDelay = delay + 's';
    delay += 0.2;
    count++;
}


$(".signup-button").click(function () {
    //check if the screen size bigger then 768 to add animation rtl else add animation ttb
    if (screen.width > 768) {
        //class about animation that move from right to left
        $('.login-signup-above').removeClass('moveltr');
        $('.login-signup-above').addClass('movertl');
    }else{
        //class about animation that move from top to bottom
        $('.login-signup-above').removeClass('movebtt');
        $('.login-signup-above').addClass('movettb');
    }
 
    //change the form action link
    $('.form-style').attr('action','/home/user/register');

    //change the text when click on signup
    $('.login-signup-above-header h2').text('حساب جديد');
    $('.append-username').append('<input type="text" class="username form-control" name="username" placeholder=" إسم المستخدم" required>');
    $('.submit-laws').text('إنشاء');

    //change the css when click on signup
    $('.login-signup-back').css({
        'background-color': 'rgba(255, 255, 255, 0.349)',
        'box-shadow': '0px 0px 50px black',
        'color': 'black',
    })
})


$('.login-button').click(function () {
    //check if the screen size bigger then 768 to add animation ltr else add animation btt
    if (screen.width > 768) {
        //class about animation that move from left to right
        $('.login-signup-above').removeClass('movertl');
        $('.login-signup-above').addClass('moveltr');
    }else{
         //class about animation that move from bottom to top
        $('.login-signup-above').removeClass('movettb');
        $('.login-signup-above').addClass('movebtt');
    }

     //change the form action link
     $('.form-style').attr('action','/home/user/login');

    //change the text when click on login-back
    $('.login-signup-above-header h2').text('تسجيل دخول');
    $('.username').remove();
    $('.submit-laws').text('تسجيل');

    //change the css when click on signup
    $('.login-signup-back').css({
        'background-color': 'rgba(0, 0, 0, 0.5)',
        'box-shadow': '0px 0px 75px white',
        'color': 'white'
    })

})

