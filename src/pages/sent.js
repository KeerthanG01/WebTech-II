import React from "react";
import "materialize-css";
import M from "materialize-css";
import { DatePicker } from "react-materialize";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-materialize";
import Particles from 'react-particles-js';
import submitbtn from "../components/style";

const trigger = <button style={submitbtn}>Compose Mail </button>


class Sent extends React.Component {
  intervalId;
  componentDidMount() {
    var check = localStorage.getItem('token');
    if (!check) {
      window.location.href = "/login";
    }
    function display_mail(e, response) {
      var id = e.target.id;
      //var response = e.currentTarget.response;
      document.getElementById("individual_display").innerHTML = "";
      console.log(e.target.id.substring(0, e.target.id.toString()));
      console.log(document.getElementById("individual_display").innerHTML);
      console.log(response[id]);
      var division = document.createElement("div");
      division.setAttribute("className", "col m12");
      var head_subject = document.createElement("h5");
      var head_sub = document.createElement("h5");
      head_sub.innerHTML = response[id]["subject"];
      //head_subject.innerHTML = "Subject :" + "<br>";
      var head_body = document.createElement("h5");
      var pre_tag = document.createElement("pre");
      var head_bod = document.createElement("h6");
      head_bod.innerHTML = response[id]["body"];
      //head_body.innerHTML += "Body :" + "<br>";
      pre_tag.appendChild(head_bod);
      division.appendChild(head_subject);
      division.appendChild(head_sub);
      division.appendChild(head_body);
      division.appendChild(pre_tag);
      document.getElementById("individual_display").append(division);
    };
    function add_mails(id, response) {
      document.getElementById(id).innerHTML = ""
      for (var i = 0; i < response.length; i++) {
        //console.log("notification");
        console.log(response[i]["sender"]);
        console.log(response[i]["subject"]);
        console.log(response[i]["body"]);
        // document.getElementById("display").innerHTML += response[i]["subject"]
        var division = document.createElement("div");
        division.className = "col m12 card";
        division.setAttribute("id", i);
        var head = document.createElement("h5");
        var anchor = document.createElement("a");
        anchor.setAttribute("id", i);
        anchor.href = "#";
        var div_sub = document.createElement("div");
        div_sub.className = "col s6 m9";
        var div_user = document.createElement("div");
        div_user.className = "col s6 m3";
        var user_head = document.createElement("h5");
        user_head.innerHTML = response[i]["receiver"];
        user_head.setAttribute("align", "center")
        var sub_head = document.createElement("h5");
        //sub_head.innerHTML = response[i]["subject"];
        div_user.appendChild(user_head);
          div_sub.append(sub_head);
        anchor.innerHTML = response[i]["subject"];
        anchor.addEventListener("click", function (e) {
          display_mail(e, response);
        });
        sub_head.appendChild(anchor);
        head.appendChild(div_user);
        head.appendChild(div_sub);
        division.appendChild(head);
        document.getElementById(id).appendChild(division);
      }
    };
    function sent_get() {
      // Display all the Assignment Mails
      //document.getElementById("display").innerHTML = "Assignment Change";
      console.log("assignment get called");
      var obj = {
        xhr: new XMLHttpRequest(),
        get_mails: function () {
          const token = localStorage.getItem('token');
          this.xhr.open("GET", "http://localhost:8080/mails/sent", true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader('Authorization', token);
          this.xhr.send();
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              console.log("Correct");
              const mails = JSON.parse(this.responseText);
              console.log(mails)
              console.log(this.responseText)
              //TODO mails is a list of mails
              var response = [
                {
                  "receiver": [
                    "user2"
                  ],
                  "readBy": [],
                  "_id": "5e95afce99bc312288633f48",
                  "sender": "user1",
                  "timeSent": "2020-04-14T12:42:54.386Z",
                  "subject": "subject2",
                  "body": "body2",
                  "category": "assignment",
                  "mailId": 10000,
                  "__v": 0
                }
              ]
  
              //TODO: mails is a list of mails for each mail create a div showing subject
              add_mails("display", mails);
            }
            if(this.status == 401){
              alert("Token Expired! You are being logged out");
              window.location = '/logout';
            }
          }
        }
      }
      obj.get_mails();
    };

    // Auto initialize all the things!
    M.AutoInit();
    sent_get.bind(this);
    sent_get();
    this.intervalId = setInterval(sent_get,20000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    function send_mail() {
      console.log("Sending MAil");
      console.log(document.getElementById("to_mail").value);
      console.log(document.getElementById("subject").value);
      console.log(document.getElementById("content").value);
      var mail_object = {
        xhr: new XMLHttpRequest(),
        mail_send: function () {
          const token = localStorage.getItem('token');
          this.xhr.open("POST", "http://localhost:8080/mails/post", true);
          this.xhr.onreadystatechange = this.callback;
          this.xhr.setRequestHeader('Authorization',token);
          this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          let receiver = document.getElementById("to_mail").value.split(',');
          var content = {
            receiver: receiver,
            subject: document.getElementById("subject").value,
            body: document.getElementById("content").value
          }
          console.log("Sending data");
          console.log(content);
          this.xhr.send(JSON.stringify(content));
        },
        callback: function () {
          if (this.readyState == 4) {
            if (this.status == 201) {
              alert("Mail sent");
              window.location.href = "/sent";
            }
            if (this.status == 500) {
              alert("Internal Server Error");
              window.location.href = "/sent";
            }
            if (this.status == 401){
              alert("Token Expired! You are being logged out");
              window.location = '/logout';
            }
          }
        }
      }
      mail_object.mail_send();
    }

    const particleStyle = {
      width: "100%",
      height: "100%",
      position: "fixed",
      "z-index": "-10",
      top: "0",
      left: "0",
      "background-image": "linear-gradient(to right, #30CFD0 0%, #330867 80%)"
    }

    const divStyle = {
      "background-image": "linear-gradient(to right, #94c997 0%, #daacec 74%)",
      "background-color": "transparent"
    }

    return (
      <>
        <main className="col s2">
        <Particles style={particleStyle}
            params={{
              "particles": {
                "number": {
                  "value": 140,
                  "density": {
                    "enable": true,
                    "value_area": 800
                  }
                },
                "color": {
                  "value": "#0e2775"
                },
                "shape": {
                  "type": "circle",
                  "stroke": {
                    "width": 0,
                    "color": "#000000"
                  },
                  "polygon": {
                    "nb_sides": 5
                  },
                  "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                  }
                },
                "opacity": {
                  "value": 1,
                  "random": false,
                  "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                  }
                },
                "size": {
                  "value": 3,
                  "random": true,
                  "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                  }
                },
                "line_linked": {
                  "enable": true,
                  "distance": 150,
                  "color": "#ffffff",
                  "opacity": 1,
                  "width": 1.0001416867389552
                },
                "move": {
                  "enable": true,
                  "speed": 6,
                  "direction": "none",
                  "random": true,
                  "straight": false,
                  "out_mode": "bounce",
                  "bounce": false,
                  "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                  }
                }
              },
              "interactivity": {
                "detect_on": "canvas",
                "events": {
                  "onhover": {
                    "enable": false,
                    "mode": "repulse"
                  },
                  "onclick": {
                    "enable": true,
                    "mode": "push"
                  },
                  "resize": true
                },
                "modes": {
                  "grab": {
                    "distance": 400,
                    "line_linked": {
                      "opacity": 1
                    }
                  },
                  "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                  },
                  "repulse": {
                    "distance": 200,
                    "duration": 0.4
                  },
                  "push": {
                    "particles_nb": 4
                  },
                  "remove": {
                    "particles_nb": 2
                  }
                }
              },
              "retina_detect": false
            }}
          />
          <div className="row">
          <div className="col s6 m2 offset-m1 center" style={{"background-color":"transparent"}}>
                <Modal header="Compose Mail" trigger={trigger}>
                <div className="col s12 m5 offset-m3 card center">
                  <div className="input-field col s12">
                    <input className="validate" type="text" name="to_mail" id="to_mail" required />
                    <label for="to_mail">To:</label>
                  </div>

                  <div className="input-field col s12">
                    <input className="validate" type="text" name="subject" id="subject" required />
                    <label for="subject">Subject:</label>
                  </div>

                  <div className="input-field col s12">
                    <textarea className="validate materialize-textarea" type="text" name="content" id="content" required />
                    <label for="content">Content:</label>
                  </div>

                  <Button onClick={send_mail}>Send Mail</Button>
                </div>
                </Modal>
              </div>
              <div className="col s8">
                {/* <div className="col s3 m1 offset-m12 card center">
                <h6>
                  <NavLink to="/sent" exact>
                    Sent
                  </NavLink>
                </h6>
                </div> */}
                <div className="col s2 offset-s11 center-align" style={{"background-color": "transparent"}}>
                <a  class='dropdown-trigger btn' href='#' style={submitbtn} data-target='dropdown1'>menu</a>
                  <ul id='dropdown1' class='dropdown-content'>
                    <li> 
                      <NavLink to="/sent" exact>
                        Sent
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/home" exact>
                        Home
                      </NavLink>
                    </li>
                    <li class="divider" tabindex="-1"></li>
                    
                  </ul>
                </div>
              </div>
              </div>
              <div className="row">
            <div className="col s6">
              <div className="col m12 card center" style={divStyle}>
              <h5>
              Sent
              </h5>
              </div>                
            <div className="col m12 card " style={{"background-color": "transparent"}}>
                <h5 id="display" className="section scrollspy" ></h5>
            </div>
            </div>
            <div className="col s6">
              <div className="col m12 card" style={divStyle}>
              <p id="individual_display" className="section scrollspy">Displaying Each Individual Mail in Subject and Content format
              </p>
                
              </div>
            </div>
            
          </div>
        </main>
      </>
    );
  }
}

export default Sent;