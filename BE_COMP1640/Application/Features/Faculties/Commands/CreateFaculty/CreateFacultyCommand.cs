using ErrorOr;
using MediatR;

namespace Application.Features.Faculties.Commands.CreateFaculty
{
    public class CreateFacultyCommand : IRequest<ErrorOr<Success>>
    {

        /// <example>IT</example>
        public string Name { get; set; }
    }
}
