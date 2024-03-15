namespace Application.Features.Auth.Commands.Register;

public class RegisterDto
{
    //constructor
    public RegisterDto(string message)
    {
        Message = message;
    }

    public string Message { get; set; }
}