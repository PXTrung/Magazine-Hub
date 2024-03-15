using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<Contribution> Contributions { get; set; }

        public ICollection<Feedback> Feedbacks { get; set; }

        public Guid? FacultyId { get; set; }

        public Faculty? Faculty { get; set; }

    }
}
