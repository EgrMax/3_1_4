package ru.itmentor.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import ru.itmentor.spring.boot_security.demo.model.User;
import ru.itmentor.spring.boot_security.demo.service.UserService;

import java.security.Principal;

@RestController
public class RestUserController {

    private final UserService userService;


    @Autowired
    public RestUserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/user")
    public ModelAndView getUserView(Principal principal) {
        ModelAndView modelAndView = new ModelAndView("app");
        modelAndView.addObject("user", userService.getUserByName(principal.getName()));
        return modelAndView;
    }

    @GetMapping("/api/user")
    public ResponseEntity<User> getUser(Principal principal) {
        User user = userService.getUserByName(principal.getName());
        return user != null
                ? new ResponseEntity<>(user, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}