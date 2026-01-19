"use client";
import { AppDispatch } from "../store";
import * as authReducer from "../reducers/authReducer";
import { getUpdatedTokenAction, signInAction, signUpAction, updateUserAction } from "@/utils/graphql/auth/action";
import { SignInInput, SignupFormType } from "@/lib/types";
import { UpdateUserType } from "@/types/profile";

export const login =
  (form: SignInInput) =>
    async (dispatch: AppDispatch) => {
      try {
        const res = await signInAction({ variables: { input: form } });
        if (res?.signIn?.success) {
          const { accessToken, refreshToken, user, token } = res.signIn;
          dispatch(
            authReducer.login({
              access_token: accessToken,
              refresh_token: refreshToken,
              token: token,
              user: { ...user, role: user?.role?.toLowerCase() },
            })
          );
        }
        return res;
      } catch (err: any) {
        return {
          message: err.message as string,
          success: false
        };
      }
    };
export const signUp = async (userData: SignupFormType) => {
  const res = await signUpAction({ input: userData })
  if (typeof res === "string") {
    return {
      message: res,
      success: false
    };
  }
  return res;
};

export const appLogout = () => async (dispatch: AppDispatch) => {
  dispatch(authReducer.logout());
  return true
}


// export const forgotPassword = (formData: any) => async (dispatch: AppDispatch) => {
//   try {
//     const res = await forgetPd({ variables: { input: formData } });
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };


export const updateUser = (form: UpdateUserType, fileUploadPath?: string, profile?: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await updateUserAction(form, fileUploadPath, profile);
    if (res?.updateUser.success) {
      dispatch(authReducer.updateUser({ user: { ...res.updateUser.user } }));
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const getTokenAction = () => async (dispatch: AppDispatch) => {
  const res = await getUpdatedTokenAction()
  if (typeof res === "number") {
    dispatch(authReducer.updateToken(res));
  }
};
