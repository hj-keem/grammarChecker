package com.example.hangulsarang.worldcup;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/start")
    public String home() {
        return "redirect:/worldcup.html";
    }
}
