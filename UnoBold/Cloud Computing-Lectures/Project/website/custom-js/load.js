$(document).ready(function(){
  var getApi = "";
  axios.get(getApi)
      .then(function (response) {
        console.log(response);
        var about = response.data.about;
        var experience = response.data.experience;
        var address = response.data.address;
        var award = response.data.award;
        var blog = response.data.blog;
        var education = response.data.education;
        var email = response.data.email;
        var intro = response.data.intro;
        var name = response.data.name;
        var phone = response.data.phone;
        var portfolio = response.data.portfolio;
        var skill = response.data.skill;


        // Load Intro
        // var intro_html = '[ "';
        // for(var i = 0; i < intro.length; i++){
        //     intro_html = intro_html+intro[i];
        //     if(i < intro.length-1){
        //       intro_html = intro_html + '", "';
        //     }
        // }
        // intro_html = intro_html + '" ]';
        // $('#intro-text').attr('data-type',intro_html);
        // wow = new WOW({});wow.init();


        // Load About
        var about_html = "";
        for(var i = 0; i < about.length; i++){
            about_html = about_html+"<p>"+about[i]+"</p>";
        }
        $("#about-text").html(about_html);


        // Load Experience
        var experience_html = "";
        for(var i = 0; i < experience.length; i++){
          var item = JSON.parse(experience[i]);
          var slide1 = "slideInRight";
          var slide2 = "slideInLeft";
          var position = "timeline-left";
          var date_position = "date";
          if(i == 0 || i % 2 == 0){
            slide1 = "slideInLeft";
            slide2 = "slideInRight";
            position = "timeline-right";
            date_position = "date-inverted";
          }
          experience_html = experience_html+'<li class="'+position+'"><div class="timeline-badge"><i class="fa fa-calendar"></i><p class="'+date_position+' wow '+slide1+'">'+item.duration+'</p></div><div class="timeline-panel wow '+slide2+'"><div class="experience-content"><h4>'+item.name+'</h4><h5>'+item.designation+'</h5><p>'+item.description+'</p></div></div></li>';
        }
        $('#experience-timeline').html(experience_html);


        // Load Education
        var education_html = "";
        for(var i = 0; i < education.length; i++){
          var item = JSON.parse(education[i]);
          var slide1 = "slideInRight";
          var slide2 = "slideInLeft";
          var position = "timeline-left";
          var date_position = "date";
          if(i == 0 || i % 2 == 0){
            slide1 = "slideInLeft";
            slide2 = "slideInRight";
            position = "timeline-right";
            date_position = "date-inverted";
          }
          education_html = education_html+'<li class="'+position+'"><div class="timeline-badge"><i class="fa fa-calendar"></i><p class="'+date_position+' wow '+slide1+'">'+item.duration+'</p></div><div class="timeline-panel wow '+slide2+'"><div class="experience-content"><h4>'+item.degree+'</h4><h5>'+item.school+'</h5><p>'+item.description+'</p></div></div></li>';
        }
        $('#education-timeline').html(education_html);


        // Load Award
        var award_html = "";
        for(var i = 0; i < award.length; i++){
          var item = JSON.parse(award[i]);
          var slide1 = "slideInRight";
          var slide2 = "slideInLeft";
          var position = "timeline-left";
          var date_position = "date";
          if(i == 0 || i % 2 == 0){
            slide1 = "slideInLeft";
            slide2 = "slideInRight";
            position = "timeline-right";
            date_position = "date-inverted";
          }
          award_html = award_html+'<li class="'+position+'"><div class="timeline-badge"><i class="fa fa-calendar"></i><p class="'+date_position+' wow '+slide1+'">'+item.year+'</p></div><div class="timeline-panel wow '+slide2+'"><div class="experience-content"><h4>'+item.award+'</h4><h5>'+item.position+'</h5><p>'+item.description+'</p></div></div></li>';
        }
        $('#award-timeline').html(award_html);


        // Load Skill
        var skill_html = "";
        for(var i = 0; i < skill.length; i++){
          var item = JSON.parse(skill[i]);
          skill_html = skill_html+'<div class="col-xs-3"><div class="progressbar" data-animate="false"><div class="circle" data-percent="'+item.confidence+'" data-color="#04b962"><div></div><p>'+item.tech+'</p></div></div></div>';
        }
        $('#skill-wrap').html(skill_html);


        // Load Portfolio
        var portfolio_html = "";
        for(var i = 0; i < portfolio.length; i++){
          var item = JSON.parse(portfolio[i]);
          portfolio_html = portfolio_html+'<div class="col-md-3 col-xs-6 no-space isotopeSelector '+item.group+'"><div class="portfolio-wrapper"><img src="'+item.thumb+'" alt="'+item.project_name+'"><div class="portfolio-overlay"><div class="portfolio-overlay-inner"><div class="portfolio-overlay-content"><div class="portfolio-link"><a title="Details" target="_blank" href="'+item.link+'"><i class="fa fa-link"></i></a><a data-lightbox="'+item.group+'" data-title="'+item.project_name+'" href="'+item.image+'"><i class="fa fa-search-plus"></i></a></div><div class="portfolio-caption"><h3><a href="'+item.link+'">'+item.project_name+'</a></h3></div></div></div></div></div></div>';
        }
        $('#portfolio-container').html(portfolio_html);

        
        // Load Skill
        var blog_html = "";
        for(var i = 0; i < blog.length; i++){
          var item = JSON.parse(blog[i]);
          blog_html = blog_html+'<div class="item"><article class="post-wrap"><div class="post-thumb"><img src="'+item.image+'" alt="'+item.title+'"></div><div class="post-content"><div class="post-title"><h3><a target="_blank" href="'+item.link+'">'+item.title+'</a></h3></div><div class="post-excerpt"><p>'+item.description+'<a target="_blank" class="btn-more" href="'+item.link+'">Read More <i class="fa fa-angle-double-right"></i></a></p></div><div class="post-meta"><span><i class="fa fa-user"></i><a target="_blank" href="'+item.link+'">'+item.author+'</a></span><span><i class="fa fa-calendar"></i><a target="_blank" href="'+item.link+'">'+item.date+'</a></span></div></div></article></div>';
        }
        $('#blog-wrap').html(blog_html);

        // Footer
        $('#contact-desc-address').html(address);
        $('#contact-desc-email').html('<a href="mailto:'+email+'">'+email+'</a>');
        $('#contact-desc-phone').html('<a href="tel:'+phone+'">'+phone+'</a>');


      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
});

