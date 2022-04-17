using AutoMapper;
using DVers.Data.Models;
using DVers.DTOs.Input;
using DVers.DTOs.Output;
using DVers.Services.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DVers.Services.MappingConfiguration
{
    public class ApplicationProfile : Profile
    {
        public ApplicationProfile()
        {
            CreateMap<LoginRegisterInputModel, User>()
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => Hasher.Hash(src.Password)))
                .ForMember(dest => dest.Delivers, opt => opt.MapFrom(src => new List<Deliver>()));
            CreateMap<DeliverInputModel, Deliver>();

            CreateMap<User, UserViewModel>();
            CreateMap<Deliver, DeliverViewModel>()
                .ForMember(dest => dest.DelivererUserName, opt => opt.MapFrom(src => src.Deliverer.UserName));
        }
    }
}
