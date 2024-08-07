package com.example.hangulsarang;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/hangulsarang")
    public String home(){
        return "main";
    }

    @GetMapping("/spellcheck")
    public String spellcheck() {
        return "spellcheck";
    }

    @GetMapping("/game")
    public String game() {
        return "game";
    }

    @GetMapping("/notice")
    public String notice() {
        return "notice";
    }

    @GetMapping("/addpost")
    public String addpost(){
        return "addpost";
    }

    @GetMapping("/post-detail")
    public String postDetail(){
        return "post-detail";
    }

    @GetMapping("/edit-post")
    public String editPost(){
        return "edit-post";
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome"; // /src/main/resources/templates/welcome.html
    }

    @GetMapping("/login")
    public String login() {
        return "login"; // /src/main/resources/templates/login.html
    }
}
