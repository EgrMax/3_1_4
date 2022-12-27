package ru.itmentor.spring.boot_security.demo.service;

import ru.itmentor.spring.boot_security.demo.model.Role;
import ru.itmentor.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {

    void addUser(User user);

    List<User> getAll();

    void deleteUser(long id);

    User getById(long id);

    List<Role> roleList();
}
