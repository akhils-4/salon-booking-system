package com.akhil.service.imp;

import com.akhil.exception.UserException;
import com.akhil.model.User;
import com.akhil.payload.dto.KeycloakUserDTO;
import com.akhil.repository.UserRepository;
import com.akhil.service.KeycloakService;
import com.akhil.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final KeycloakService keycloakService;



    private final UserRepository userRepository;
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(Long id) throws UserException {
        Optional<User> opt = userRepository.findById(id);
        if(opt.isPresent()){
            return opt.get();
        }else {
            throw new UserException("User not found");
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) throws UserException {
        Optional<User> opt = userRepository.findById(id);
        if(opt.isEmpty()){
            throw new UserException("User not exist with id"+id);
        }
        userRepository.deleteById(opt.get().getId());

    }


    @Override
    public User updateUser(Long id,User user) throws UserException {
        Optional<User> opt = userRepository.findById(id);

        if(opt.isEmpty()){
            throw new UserException("User not found with id "+id);

        }
        User existingUser = opt.get();

        existingUser.setFullName(user.getFullName());
        existingUser.setEmail(user.getEmail());
        existingUser.setRole(user.getRole());
        existingUser.setUsername(user.getUsername());

        return  userRepository.save(existingUser);
    }

    @Override
    public User getUserFromJwt(String token) throws Exception {
        KeycloakUserDTO keycloakUserDTO = keycloakService.fetchUserProfileByJwt(token);
        return userRepository.findByEmail(keycloakUserDTO.getEmail());
    }
}
