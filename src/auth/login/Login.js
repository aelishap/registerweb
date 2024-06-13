import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { login } from '../../redux/actions/auth.action';
import { Form, Input, Button, Alert,Typography} from 'antd';
import { Images } from '../../assests/images/images';

const Login = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredUsers = useSelector((state) => state.registeredUsers);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
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
    const { username, password } = values;
    const user = registeredUsers.find((u) => u.username === username && u.password === password);
    if (user) {
      dispatch(login(user));
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(90deg, #ECBC76 50%, #FFFFFF 50%)' }}>
    {isMobile > 950 && <img src={Images.images2} className='pb-[190px] w-[14%]' />}
     <div className=" w-[80%] md:w-[47%] xl:w-[35%]  p-8 bg-white rounded-[8%] shadow-2xl shadow-[gray]">
      <div className='flex justify-between'>
<div>

       <Typography className='text-[20px]'>Welcome to Lorem</Typography>
       <Typography className='text-[34px] font-bold mb-8 mt-2'>Sign in</Typography>
</div>
<Typography className='text-[gray]' onClick={()=>{
   navigate('/register');
}}>No account? <span className='text-[#ECBC76]'>Sign up</span></Typography>
      </div>
        {error && <Alert message={error} type="error" showIcon className="mb-4" />}
        <Form form={form} onFinish={handleSubmit}>
        <Typography>Enter your email address</Typography>

          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
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
              Login
            </Button>
          </Form.Item>
        </Form>
        <p className="mt-4 text-center">
           <Typography className='text-[gray]'>Or</Typography>
           <div className='flex justify-center gap-4 mt-8'>
           <div className='flex justify-center gap-4 mt-8'>
      <img src={Images.google} className="w-[80%] md:w-[75%] lg:w-[60%]" alt="Google" />
      <img src={Images.facebook} className="w-[10%] md:w-[15%] lg:w-[20%]" alt="Facebook" />
      <img src={Images.apple} className="w-[10%] md:w-[15%] lg:w-[20%]" alt="Apple" />
    </div>
    </div>
        
        </p>

      </div>
      {isMobile > 950 &&<img src={Images.images1} className='w-[20%] '/>}
    </div>
  );
};

export default Login;
