package com.akhil.service;


import com.akhil.payload.dto.SignupDTO;
import com.akhil.payload.response.AuthResponse;

public interface AuthService {

    AuthResponse login(String username, String password) throws Exception;
    AuthResponse signup(SignupDTO req) throws Exception;
    AuthResponse getAccessTokenFromRefreshToken(String refreshToken) throws Exception;


}
