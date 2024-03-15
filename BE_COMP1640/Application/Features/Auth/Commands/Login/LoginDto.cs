namespace Application.Features.Auth.Commands.Login
{
    public class LoginDto
    {
        //constructor
        public LoginDto(string jwtToken)
        {
            JwtToken = jwtToken;
        }


        public string JwtToken { get; set; }
    }
}
