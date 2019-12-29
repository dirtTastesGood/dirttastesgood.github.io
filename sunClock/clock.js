
function Clock() {
    $container = $("#clock-container");
    let c = document.getElementById("circleCanvas");
    let radius = ($container.width() * .8) / 2;
    let centerX = $container.width() / 2;
    let centerY = $container.height() / 2;
    let centerPoint = $("#centerPoint");
  
  
    let sunMoonData;
    let sun = $("#sunIcon");
    let moon = $("#moonIcon");
    let sunCoords = [];
  
    let riseTime, setTime, riseTimeInHours, setTimeInHours;
    let riseAngle, setAngle;
    let time, timeInHours;
    let timeLabel = $("#currentTimeLabel");
    let timeArrow = $("#timeArrow");
    let newAngle;
    let rotationDirectionArrow = $("#rotationDirectionArrow");
  
  
    c.height = 800;
    c.width = 800;
  
    //
    this.callAjax = function(location){
        let url = `https://api.aerisapi.com/sunmoon/${location}?client_id=${aerisId}&client_secret=${aerisSecret}`
      
      $("#cityName").html(location);
      return $.ajax({
                url: url,
                dataType: 'json',
                success: function(data){
                  sunMoonData = data;
                }
              });
    }
    //
    this.saveAjaxResponse = function(response){
      sunMoonData = response;
  
      let times = [];
      riseTime = sunMoonData.response[0].sun.riseISO.substr(11,8);
      setTime = sunMoonData.response[0].sun.setISO.substr(11,8);
  
      times = [riseTime, setTime];
      return times;
  
    }
    //
  
    this.calculateCoords = function(rise, set){
      let coords = [];
  
      riseTime = rise;
      setTime = set;
  
      riseAngle = (2 * Math.PI * rise / 24) - Math.PI / 2;
      setAngle = (2 * Math.PI * set / 24) - Math.PI / 2;
  
      let riseX = radius * Math.cos(riseAngle);
      let riseY = radius * Math.sin(riseAngle);
  
      let setX = radius * Math.cos(setAngle);
      let setY = radius * Math.sin(setAngle);
  
      coords = [riseX, riseY, setX, setY];
      return coords
    } // end calculateCoords
  
    this.draw = function(data){
      let vars = ["x1", "y1", "x2", "y2"];
  
      // assign vales of data array to the variable names in vars
      for(i=0; i<data.length; i++){
        this[vars[i]] = eval(data[i]);
      }
  
      $container.css({position:'relative'});
      $("[name^=label]").css({position:'absolute'});
  
      centerPoint.css({left: centerX, top: centerY});
      sun.css({left: centerX + this.x1 - sun.width() / 2 + "px",
                  top: centerY + this.y1 - sun.height() / 2 + "px"});
      moon.css({left: centerX + this.x2 - moon.width() / 2 + "px",
                  top: centerY + this.y2 - moon.height() / 2 + "px"});
  
      let p1 = sun.position();
      let p2 = moon.position();
  
      let ctx = c.getContext("2d");
  
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, riseAngle, setAngle);
      ctx.strokeStyle = "#253651";
      ctx.stroke();
      ctx.lineTo(centerX, centerY);
      ctx.lineTo(p1.left + sun.width() / 2, p1.top + sun.height() / 2);
      ctx.fillStyle = "#4286f4";
      ctx.fill();
  
      ctx.beginPath();
      ctx.stroke();
      ctx.arc(centerX, centerY, radius, setAngle, riseAngle);
      ctx.lineTo(centerX, centerY);
      ctx.lineTo(p2.left + moon.width() / 2, p2.top + moon.height() / 2);
      ctx.fillStyle = "#000000";
      ctx.fill();
      ctx.stroke();
  
      timeLabel.css({left: centerX - timeLabel.width() / 2 + "px", top: "-30px"});
      timeArrow.css({left: centerX - timeArrow.width() / 2 + "px", top: "10px" });
      rotationDirectionArrow.css({left: "20px", top: "10px"});
    }
  
    this.timeToHours = function(time){
      let h = parseFloat(time.substr(0,2)); // hours
      let m = parseFloat(time.substr(3,2)); // minutes
      let s = parseFloat(time.substr(6,2)); // seconds
  
      let timeInHours = h + m/60 + (s/60)/60;
      return timeInHours;
    } // end timeToHours
  
    function checkTime(t) {
      if (t < 10) {
        t = "0" + t;
      }
      return t;
    }
  
    this.getTime = function(){
      let today = new Date();
      let currentTime;
      let h = today.getHours();
      let m = today.getMinutes();
      let s = today.getSeconds();
      // add a zero in front of numbers<10
      h = checkTime(h);
      m = checkTime(m);
      s = checkTime(s);
  
      currentTime = h.toString() + ":" + m.toString() + ":" + s.toString();
      return currentTime
    }
  
    this.twelveHourTime = function(t){
      let hour = t.substr(0,2);
      let min = t.substr(3,2);
      let sec = t.substr(6,2);
      let ampm = "a.m.";
  
      if(hour<10){
        hour = hour.substr(1,1);
      }
  
      if(hour > 12){
        hour -= 12
        ampm = "p.m."
      }
  
      t = hour + ":" + min + ":" + sec + " " + ampm;
      return t
    }
  
    this.rotate = function(){
      time = this.getTime();
      timeInHours = this.timeToHours(time);
  
      newAngle = 360 * timeInHours / 24;
      $("#circleCanvas").css({'transform':'rotate(' + -newAngle + 'deg'});
  
      return newAngle
    }
  
    this.placeIcons = function(){
      let angle = newAngle * Math.PI / 180;
  
      let sunX = radius * Math.cos(riseAngle - angle) + centerX;
      let sunY = radius * Math.sin(riseAngle - angle) + centerY;
  
      let moonX = radius * Math.cos(setAngle - angle) + centerX;
      let moonY = radius * Math.sin(setAngle - angle) + centerY;
  
      sun.css({left: sunX + "px", top: sunY - sun.height() / 2});
      moon.css({left: moonX + "px", top: moonY - moon.height() / 2});
  
      sun.fadeTo(3000, 100);
      moon.fadeTo(3000, 100);
    }
  }
  