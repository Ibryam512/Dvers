using AutoMapper;
using DVers.Data.Models;
using DVers.DTOs.Input;
using DVers.DTOs.Output;
using DVers.Services.Helpers;
using DVers.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DVers.Controllers
{
    [Route("api/delivers")]
    [ApiController]
    public class DeliversController : ControllerBase
    {
        private readonly IDeliverService _deliverService;
        private readonly IMapper _mapper;

        public DeliversController(IDeliverService deliverService, IMapper mapper)
        {
            this._deliverService = deliverService ?? throw new ArgumentNullException(nameof(deliverService));
            this._mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        [HttpGet]
        public IActionResult Index()
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var delivers = this._deliverService.GetDelivers();
            var deliversView = new List<DeliverViewModel>();
            foreach (var deliver in delivers)
            {
                deliversView.Add(this._mapper.Map<DeliverViewModel>(deliver));
            }
            return new JsonResult(deliversView);
        }

        [HttpGet("{id}")]
        public IActionResult DeliverDetails(int id)
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var deliver = this._deliverService.GetDeliver(id);

            if (deliver == null)
            {
                return NotFound();
            }

            var deliverView = this._mapper.Map<DeliverViewModel>(deliver);

            return new JsonResult(deliverView);
        }

        [HttpGet("add")]
        public IActionResult Add()
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            return Ok();
        }

        [HttpPost("add")]
        public IActionResult Add(DeliverInputModel inputModel)
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var deliver = this._mapper.Map<Deliver>(inputModel);
            deliver.DelivererId = Logged.User.Id;
            this._deliverService.AddDeliver(deliver);

            return Ok();
        }

        [HttpGet("edit/{id}")]
        public IActionResult Edit(int id)
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var deliver = this._deliverService.GetDeliver(id);

            if (deliver == null)
            {
                return NotFound();
            }

            if (deliver.DelivererId != Logged.User.Id)
            {
                return Unauthorized();
            }

            var deliverView = this._mapper.Map<DeliverViewModel>(deliver);

            return new JsonResult(deliverView);
        }

        [HttpPut("edit/{id}")]
        public IActionResult Edit(DeliverInputModel inputModel, int id)
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var deliver = this._mapper.Map<Deliver>(inputModel);
            deliver.Id = id;
            deliver.DelivererId = Logged.User.Id;
            this._deliverService.EditDeliver(deliver);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public IActionResult Delete(int id)
        {
            if (!Logged.IsLogged())
            {
                return Unauthorized();
            }

            var deliver = this._deliverService.GetDeliver(id);

            if (deliver == null)
            {
                return NotFound();
            }

            if (deliver.DelivererId != Logged.User.Id)
            {
                return Unauthorized();
            }

            this._deliverService.DeleteDeliver(deliver);

            return Ok();
        }
    }
}
