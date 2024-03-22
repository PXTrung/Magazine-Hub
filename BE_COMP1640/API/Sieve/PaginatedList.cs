using Microsoft.EntityFrameworkCore;
using Sieve.Models;
using Sieve.Services;

namespace API.Sieve
{
    public class PaginatedList<T>
    {
        public IReadOnlyCollection<T> Items { get; }
        public int CurrentPage { get; }
        public int TotalPages { get; }
        public int TotalCount { get; }

        public PaginatedList(IReadOnlyCollection<T> items, int count, int currentPage = 1, int pageSize = 20)
        {
            CurrentPage = currentPage;
            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            TotalCount = count;
            Items = items;
        }

        public bool HasPreviousPage => CurrentPage > 1;

        public bool HasNextPage => CurrentPage < TotalPages;

        public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, ISieveProcessor sieveProcessor, SieveModel sieveModel)
        {
            var items = sieveProcessor.Apply(sieveModel, source, applyPagination: false);

            var count = await items.CountAsync();

            items = sieveProcessor.Apply(sieveModel, items, applyFiltering: false, applySorting: false);

            return new PaginatedList<T>(await items.ToListAsync(), count, sieveModel.Page ?? 1, sieveModel.PageSize ?? 10);
        }
    }


    public static class MappingExtensions
    {
        public static Task<PaginatedList<TDestination>> ToPaginatedListAsync<TDestination>(this IQueryable<TDestination> queryable, ISieveProcessor sieveProcessor, SieveModel sieveModel) where TDestination : class
            => PaginatedList<TDestination>.CreateAsync(queryable, sieveProcessor, sieveModel);


    }
}
