package it.academy.corso.diarioDigitale.user.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


import org.springframework.stereotype.Service;

import it.academy.corso.diarioDigitale.user.dto.UserDTO;
import it.academy.corso.diarioDigitale.user.model.User;
import it.academy.corso.diarioDigitale.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    @Override
    public UserDTO createUser(UserDTO userDTO) {
        userDTO.setUuid(UUID.randomUUID().toString());
        return modelToDTO(userRepository.save(dtoToModel(userDTO)));
    }

    @Override
    public UserDTO getUserByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(this::modelToDTO).orElseThrow();
    }

    @Override
    public  UserDTO getUserByUuid(String uuid){
        Optional<User> user = userRepository.findByUuid(uuid);
        return user.map(this::modelToDTO).orElseThrow();
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
            .map(this::modelToDTO)
            .toList();
    }

    @Override
    public void deleteUser(String uuid){
        User userToDelete = userRepository.findByUuid(uuid).orElseThrow();
        userRepository.delete(userToDelete);
    }

    @Override
    public UserDTO login(String username, String password){

        User user = userRepository.findByUsername(username).orElseThrow();

        if(!user.getPassword().equals(password)){
            throw new RuntimeException("username o password invalidi");
        }

        return  modelToDTO(user);
    }
    
    private UserDTO modelToDTO(User user) {
        return UserDTO.builder()
                .uuid(user.getUuid())
                .nome(user.getNome())
                .cognome(user.getCognome())
                .username(user.getUsername())
                .password(user.getPassword())
                .ruolo(user.getRuolo())
                .build();
    }

    private User dtoToModel(UserDTO userDTO) {
        return User.builder()
                .uuid(userDTO.getUuid())
                .nome(userDTO.getNome())
                .cognome(userDTO.getCognome())
                .username(userDTO.getUsername())
                .password(userDTO.getPassword())
                .ruolo(userDTO.getRuolo())
                .build();
    }
}
