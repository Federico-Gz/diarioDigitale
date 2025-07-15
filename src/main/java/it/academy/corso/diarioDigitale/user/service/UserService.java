package it.academy.corso.diarioDigitale.user.service;

import java.util.List;

import it.academy.corso.diarioDigitale.user.dto.UserDTO;

public interface UserService {

    UserDTO createUser(UserDTO userDTO);
    UserDTO getUserByUsername(String username);
    UserDTO getUserByUuid(String uuid);
    List<UserDTO> getAllUsers();
    void deleteUser(String uuid);
    UserDTO login(String username, String password);
} 