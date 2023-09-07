import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { authThunks } from "features/Login/model/auth.slice";
import { selectIsLoggedIn } from "features/Login/model/auth.selectors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ButtonLogin, ErrorMessage, FlexWrapper, FormWrapper, InputLogin, LoginTitle, LoginWrapper } from "features/Login/ui/styled";

type FormData = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().max(32).required()
});
export  const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });


  const onSubmit = (data: FormData) => {
    console.log(data);
    dispatch(authThunks.login(data));
    reset();
  };

  if (isLoggedIn) {
    return <Navigate to={"/"} />;
  }


  return <LoginWrapper>
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <p>
        or use common test account credentials:
      </p>
      <p> Email: free@samuraijs.com
      </p>
      <p>
        Password: free
      </p>
      <LoginTitle>Login</LoginTitle>
      <div>
        <InputLogin  {...register("email")} placeholder={"Email"} />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
      <div>
        <InputLogin
          autoComplete={"on"}
          type={"password"}
          {...register("password")}
          placeholder={"Password"}
        />
        {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
      </div>
      <FlexWrapper>
        <input type={"checkbox"} {...register("rememberMe")} />
        <p>remember me</p>
      </FlexWrapper>
      <ButtonLogin type={"submit"}>Login</ButtonLogin>

    </FormWrapper>
  </LoginWrapper>;
  {/*<form onSubmit={formik.handleSubmit}>*/
  }
  {/*  <FormControl>*/
  }
  {/*    <FormLabel>*/
  }
  {/*      <p>*/
  }
  {/*        To log in get registered <a href={"https://social-network.samuraijs.com/"}*/
  }
  {/*                                    target={"_blank"}>here</a>*/
  }
  {/*      </p>*/
  }
  {/*      <p>*/
  }
  {/*        or use common test account credentials:*/
  }
  {/*      </p>*/
  }
  {/*      <p> Email: free@samuraijs.com*/
  }
  {/*      </p>*/
  }
  {/*      <p>*/
  }
  {/*        Password: free*/
  }
  {/*      </p>*/
  }
  {/*    </FormLabel>*/
  }
  {/*    <FormGroup>*/
  }
  {/*      <TextField*/
  }
  {/*        label="Email"*/
  }
  {/*        margin="normal"*/
  }
  {/*        {...formik.getFieldProps("email")}*/
  }
  {/*      />*/
  }
  {/*      {formik.errors.email ? <div>{formik.errors.email}</div> : null}*/
  }
  {/*      <TextField*/
  }
  {/*        type="password"*/
  }
  {/*        label="Password"*/
  }
  {/*        margin="normal"*/
  }
  {/*        {...formik.getFieldProps("password")}*/
  }
  {/*      />*/
  }
  {/*      {formik.errors.password ? <div>{formik.errors.password}</div> : null}*/
  }
  {/*      <FormControlLabel*/
  }
  {/*        label={"Remember me"}*/
  }
  {/*        control={<Checkbox*/
  }
  {/*          {...formik.getFieldProps("rememberMe")}*/
  }
  {/*          checked={formik.values.rememberMe}*/
  }
  {/*        />}*/
  }
  {/*      />*/
  }
  {/*      <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>*/
  }
  {/*    </FormGroup>*/
  }
  {/*  </FormControl>*/
  }
  {/*</form>*/
  }


};
