package com.auradot.backend.service;

import com.auradot.backend.dto.DetailsUpdateRequestDto;
import com.auradot.backend.dto.ResponseDto.GetUserDetailsResponse;
import com.auradot.backend.dto.ResponseDto.SigninResponse;
import com.auradot.backend.dto.SigninDto;

import java.util.List;

public interface AuthService {
    public SigninResponse authSignin(SigninDto signinDto);

    void detailsUpdate(Integer userId, DetailsUpdateRequestDto detailsUpdateRequestDto);

    GetUserDetailsResponse userDetails(Integer userId);

    List<GetUserDetailsResponse> allUserDetails();

    void giveAdminApproval(String userId);
}
