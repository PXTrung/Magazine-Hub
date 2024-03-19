using Application.Features.Auth.Commands.Login;
using Application.Features.Auth.Commands.Register;
using Application.Features.Auth.Queries.ListRole;
using Application.Features.Auth.Queries.ListUser;
using Application.Features.Contributions.Commands.CreateContribution;
using Application.Features.Contributions.Commands.UpdateContribution;
using Application.Features.Contributions.Queries.GetContribution;
using Application.Features.Contributions.Queries.ListContribution;
using Application.Features.Faculties.Commands.CreateFaculty;
using Application.Features.Faculties.Queries.ListFaculty;
using Application.Features.Periods.Commands.CreatePeriod;
using Application.Features.Periods.Commands.UpdatePeriod;
using AutoMapper;
using Domain.Entities;

namespace Application.Common.Mapping;

public class MappingProfile : Profile
{


    public MappingProfile()
    {
        //Mapping of contributions 
        CreateMap<Contribution, ListContributionDto>()
            .ForMember(dest => dest.CreatedByEmail, opt => opt.MapFrom(src => src.CreatedBy.Email))
            .ForMember(dest => dest.CoverImageUrl, opt => opt.MapFrom(src => src.Image.UrlFilePath))
            .ForMember(dest => dest.DocumentUrl, opt => opt.MapFrom(src => src.Document.UrlFilePath))
            .ForMember(dest => dest.FacultyName,
                opt => opt.MapFrom(src => src.CreatedBy.Faculty != null ? src.CreatedBy.Faculty.Name : null))
            .ForMember(dest => dest.FacultyId, opt => opt.MapFrom(src => src.CreatedBy.Faculty != null ? src.CreatedBy.Faculty.Id : (Guid?)null));

        CreateMap<Contribution, GetContributionDto>()
            .ForMember(dest => dest.CreatedByEmail, opt => opt.MapFrom(src => src.CreatedBy.Email))
            .ForMember(dest => dest.CoverImageUrl, opt => opt.MapFrom(src => src.Image.UrlFilePath))
            .ForMember(dest => dest.DocumentUrl, opt => opt.MapFrom(src => src.Document.UrlFilePath));

        CreateMap<UpdateContributionCommand, Contribution>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForMember(dest => dest.Document, opt => opt.Ignore())
            .ForMember(dest => dest.Title, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Title)))
            .ForMember(dest => dest.Description, opt => opt.Condition(src => !string.IsNullOrEmpty(src.Description)));

        CreateMap<CreateContributionCommand, Contribution>()
            .ForMember(dest => dest.Image, opt => opt.Ignore())
            .ForMember(dest => dest.Document, opt => opt.Ignore());




        //Mapping of auth
        CreateMap<LoginCommand, ApplicationUser>().ReverseMap();

        CreateMap<RegisterCommand, ApplicationUser>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom((src => src.Email)));

        CreateMap<ApplicationUser, ListUserDto>()
            .ForMember(dest => dest.FacultyName,
                opt => opt.MapFrom(src => src.Faculty != null ? src.Faculty.Name : null))
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FirstName + src.LastName))
            .ForMember(dest => dest.Role,
                opt => opt.MapFrom(src => string.Join(", ", src.Roles.AsEnumerable().Select(r => r.Name))))
            .ForMember(dest => dest.FacultyId, opt => opt.MapFrom(src => src.Faculty != null ? src.Faculty.Id : (Guid?)null));


        CreateMap<ApplicationRole, ListRoleDto>();

        //Mapping of Period
        CreateMap<CreatePeriodCommand, Period>();
        CreateMap<UpdatePeriodCommand, Period>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());


        //Mapping of Faculty
        CreateMap<CreateFacultyCommand, Faculty>();
        CreateMap<Faculty, ListFacultyDto>().ReverseMap();


    }


}