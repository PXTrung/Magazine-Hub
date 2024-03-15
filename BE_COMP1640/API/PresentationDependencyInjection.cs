using API.Sieve;
using MicroElements.Swashbuckle.FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Sieve.Models;
using Sieve.Services;

namespace API;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services, IConfiguration configuration)
    {
        //Adding Sieve
        services.Configure<SieveOptions>(configuration.GetSection("Sieve"));
        services.AddScoped<ISieveProcessor, ApplicationSieveProcessor>();

        services.AddControllers();

        services.AddEndpointsApiExplorer();


        //Add Swagger
        var apiInfo = new OpenApiInfo
        {
            Title = "MagazineHub API",
            Version = "v1",
            Description = "Web API for University Magazine Contributing Managing application",
            Contact = new OpenApiContact
            {
                Name = "Group 27 - TCS2402",

            },
            License = new OpenApiLicense
            {
                Name = "Private License"
            }
        };

        apiInfo.Description += "\n\nTeam Members:\n";
        apiInfo.Description += "1. Leader - Lê Nguyên Khang\n";
        apiInfo.Description += "2. Member - Phạm Xuân Trung\n";
        apiInfo.Description += "3. Member - Phan Hòa An Khê\n";
        apiInfo.Description += "4. Member - Lê Ngọc Phương Anh\n";
        apiInfo.Description += "5. Member - Nguyễn Hồng Nhật\n";
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", apiInfo);
            options.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, new OpenApiSecurityScheme
            {
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = JwtBearerDefaults.AuthenticationScheme
            });
            options.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = JwtBearerDefaults.AuthenticationScheme
                        },
                        Scheme = "Oauth2",
                        Name = JwtBearerDefaults.AuthenticationScheme,
                        In = ParameterLocation.Header
                    },
                    new List<string>()
                }
            });
            options.DescribeAllParametersInCamelCase();
        });
        services.AddFluentValidationRulesToSwagger();
        return services;
    }
}