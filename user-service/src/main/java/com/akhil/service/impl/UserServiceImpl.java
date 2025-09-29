package com.akhil.service.impl;


import com.akhil.exception.UserException;

import com.akhil.modal.User;


import com.akhil.payload.dto.KeycloakUserinfo;
import com.akhil.repository.UserRepository;

import com.akhil.service.KeycloakUserService;
import com.akhil.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {


	private final UserRepository userRepository;
	private final KeycloakUserService keycloakUserService;



	@Override
	public User getUserByEmail(String email) throws UserException {
		User user=userRepository.findByEmail(email);
		if(user==null){
			throw new UserException("User not found with email: "+email);
		}
		return user;
	}

	@Override
	public User getUserFromJwtToken(String jwt) throws Exception {
		KeycloakUserinfo userinfo = keycloakUserService.fetchUserProfileByJwt(jwt);
        return userRepository.findByEmail(userinfo.getEmail());
	}

	@Override
	public User getUserById(Long id) throws UserException {
		return userRepository.findById(id).orElse(null);
	}

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}


}
