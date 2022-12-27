package ru.itmentor.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.itmentor.spring.boot_security.demo.model.User;
import ru.itmentor.spring.boot_security.demo.service.RoleService;
import ru.itmentor.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@RestController
public class RestAdminController {

    private final UserService userService;
    private final RoleService roleService;


    @Autowired
    public RestAdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/app")
    public ModelAndView getUsers(Principal principal) {
        ModelAndView mav = new ModelAndView("app");
        mav.addObject("user", userService.getUserByName(principal.getName()));
        mav.addObject("usersList", userService.getAllUsers());
        mav.addObject("roleList", roleService.getAllRoles());
        return mav;
    }

    @GetMapping("/api/admin")
    public ResponseEntity<List<User>> getUsers() {
        List<User> userList = userService.getAllUsers();
        return userList != null && !userList.isEmpty()
                ? new ResponseEntity<>(userList, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/api/admin")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        return newUser != null
                ? new ResponseEntity<>(newUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/api/admin")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        User editedUser = userService.editUser(user);
        return editedUser != null
                ? new ResponseEntity<>(editedUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/api/admin/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable("id") long id) {
        User delUser = userService.getUser(id);
        Boolean del = userService.deleteUser(id);
        return del ? new ResponseEntity<>(delUser, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
