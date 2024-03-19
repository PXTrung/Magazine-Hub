using Application.Features.Auth.Queries.ListUser;
using Sieve.Services;

namespace API.Sieve.Configurations
{
    public class ListUserDtoSieveCOnfiguration : ISieveConfiguration
    {
        public void Configure(SievePropertyMapper mapper)
        {
            mapper.Property<ListUserDto>(c => c.FullName)
                .CanFilter()
                .CanSort();

            mapper.Property<ListUserDto>(c => c.Email)
                .CanFilter()
                .CanSort();

            mapper.Property<ListUserDto>(c => c.FacultyName)
                .CanFilter()
                .CanSort();

            mapper.Property<ListUserDto>(c => c.FacultyId)
                .CanFilter()
                .CanSort();

        }
    }
}
