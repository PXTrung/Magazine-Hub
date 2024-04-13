﻿namespace Application.Features.Comments.Queries.ListComment
{
    public class ListCommentDto
    {
        public Guid Id { get; set; }

        public string Content { get; set; }

        public Guid ContributionId { get; set; }

        public string CreatedByEmail { get; set; }

        public string CreatedByFullName { get; set; }

        public DateTimeOffset? CreatedAt { get; set; }

        public DateTimeOffset? LastModifiedAt { get; set; }
    }
}
