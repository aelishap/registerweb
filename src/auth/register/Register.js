import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/auth.action';
import { Form, Input, Button, Typography } from 'antd';
import { Images } from '../../assests/images/images';

const Register = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isMobile, setIsMobile] = useState(window.screen.width);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = (values) => {
    const { email, username, mobile, password } = values;
    dispatch(register({ email, username, mobile, password }));
    navigate('/login');
  };

  return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(90deg, #ECBC76 50%, #FFFFFF 50%)' }}>
     {isMobile > 950 && <img src={Images.images2} className='pb-[190px] w-[14%]' alt="err" />}
      <div className=" w-[80%] md:w-[45%] xl:w-[35%]  p-8 bg-white rounded-[8%] shadow-2xl shadow-[gray]">
      <div className='flex justify-between'>
<div>

        <Typography className='text-[20px]'>Welcome to Lorem</Typography>
        <Typography className='text-[34px] font-bold mb-8 mt-2'>SignUp</Typography>
        </div>
<Typography className='text-[gray]' onClick={()=>{
   navigate('/register');
}}>Have an account? <span className='text-[#ECBC76]'>Sign in</span></Typography>
      </div>
        <Form form={form} onFinish={handleSubmit}>
          <Typography>Enter your email address</Typography>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email!'},  {
              pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: "Please enter valid email.",
            }, ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <div className='md:flex gap-4'>
            <div className='md:w-[50%]'>

          <Typography>User Name</Typography>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input placeholder="Username" maxLength={50} />
          </Form.Item>
          </div>
          <div className='md:w-[50%]'>

          <Typography>Contact Number</Typography>

          <Form.Item
            name="mobile"
            rules={[{ required: true, message: 'Please enter your contact number!' }]}
            >
            <Input placeholder="Contact Number" maxLength={10} />
          </Form.Item>
            </div>
          </div>
          <Typography>Enter your password</Typography>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!'},    {
              pattern: new RegExp(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
              ),
              message:
                "Password must be at least 8 characters long,1 upper case,1 lower case,1 digit, 1 special character",
             }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
         
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full bg-[#E48700] text-[white] py-6 rounded-lg my-4 md:my-8">
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </div>
      {isMobile > 950 &&<img src={Images.images1} className='w-[20%] ' alt="err" />}
    </div>
  );
};

export default Register;
