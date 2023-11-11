using ClosedXML.Excel;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis;
using VendorMgtMVCApp.Services.Contract;
using VendorMgtMVCApp.ViewModels;
using Document = iTextSharp.text.Document;

namespace VendorMgtMVCApp.Controllers
{
    public class VendorMasterController : Controller
    {
        private readonly IVendorMasterService _service;
        private readonly IConfiguration _config;
        public VendorMasterController(IVendorMasterService service, IConfiguration config)
        {
            _service = service;
            _config = config;
        }

        [HttpGet]
        // GET: VendorMaster1Controller
        public async Task<ActionResult> Index()
        {
            var res = await _service.GetAll();
            return View(res);
        }

        //GET: VendorMaster1Controller/Details/5
        public async Task<ActionResult> Details(int id)
        {

            if (id < 1)
                return View();
            var res = await _service.Get(id);
            return View(res.FirstOrDefault());
        }

        // GET: VendorMaster1Controller/Create
        public async Task<ActionResult> Create()
        {
            ViewData["VendorMasterId"] = new SelectList(await _service.GetOptions(), "Id", "Name");
            return View();
        }

        // POST: VendorMaster1Controller/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(VendorMasterVM vendorMasterVM)
        {
            //if (vendorMasterVM == null)
            //    return View();
            if (ModelState.IsValid)
            {
                vendorMasterVM.CollegeId = 1;
                var res = await _service.Insert(vendorMasterVM);
                if (res > 0)
                    ViewBag.Msg = _config.GetValue<string>("Messages:Success");

                else
                    ViewBag.Err = _config.GetValue<string>("Messages:Fail");
            }

            // var res = await _service.Insert(vendorMasterVM);
            ViewData["VendorMasterId"] = new SelectList(await _service.GetOptions(), "Id", "Name");
            return View();
        }

        // GET: VendorMaster1Controller/Edit/5
        public async Task<ActionResult> Edit(long id)
        {
            if (id < 1)
                return View();
            ViewData["VendorMasterId"] = new SelectList(await _service.GetOptions(), "Id", "Name");
            var res = await _service.Get(id);
            return View(res.FirstOrDefault());
        }

        // POST: VendorMaster1Controller/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(VendorMasterVM vendorMasterVM)
        {
            if (ModelState.IsValid)
            {
                var res = await _service.Update(vendorMasterVM);
                if (res != null)
                    ViewBag.Msg = "Record Updated Successfully";
                else
                    ViewBag.Err = _config.GetValue<string>("Messages:Fail");
            }
            ViewData["VendorMasterId"] = new SelectList(await _service.GetOptions(), "Id", "Name");
            return View();
        }

        // GET: VendorMaster1Controller/Delete/5
        [HttpGet]
        public async Task<ActionResult> Delete(long id)
        {
            if (id < 1)
                return View();
            var res = await _service.Get(id);
            return View(res.FirstOrDefault());
        }

        // POST: VendorMaster1Controller/Delete/5

        [HttpPost, ActionName("Delete")]
        public async Task<ActionResult> DeleteConfirm(long id)
        {
            if (id < 1)
                return NotFound();
            var res = await _service.Delete(id);
            if (res.HasValue)
                return RedirectToAction(nameof(Index));
            return View();

        }

        [HttpGet]
        public async Task<IActionResult> PDFExport()
        {
            var vendorMasterdata = await _service.GetAll();
            if (vendorMasterdata != null)
            {
                using (System.IO.MemoryStream ms = new System.IO.MemoryStream())
                {
                    Document doc = new Document(iTextSharp.text.PageSize.A4.Rotate(), 30f, 30f, 30f, 30f);
                    PdfWriter writer = PdfWriter.GetInstance(doc, ms);
                    // Page No.
                    writer.PageEvent = new PdfPageEventHelper();

                    doc.Open();

                    // Font Header
                    BaseFont bfHeader = BaseFont.CreateFont(
                            BaseFont.TIMES_BOLD,
                            BaseFont.CP1252,
                            BaseFont.EMBEDDED);
                    Font fontHeader = new Font(bfHeader, 12, Font.UNDERLINE);

                    Paragraph preface = new Paragraph();
                    preface.Add(new Phrase("Vendor Master", fontHeader));
                    preface.Alignment = Element.ALIGN_CENTER;
                    doc.Add(preface);
                    doc.Add(Chunk.NEWLINE);

                    PdfPTable table = new PdfPTable(8);

                    // Font TableHeader
                    BaseFont bfTableHeader = BaseFont.CreateFont(
                            BaseFont.TIMES_BOLD,
                            BaseFont.CP1252,
                            BaseFont.EMBEDDED);
                    Font fontTableHeader = new Font(bfTableHeader, 10, Font.UNDEFINED);

                    table.AddCell(new PdfPCell(new Phrase("Name", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Address", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("ContactNo", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Gstno", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Pan", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Tan", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("EmailId", fontTableHeader)));
                    table.AddCell(new PdfPCell(new Phrase("Website", fontTableHeader)));

                    // Font TableContent
                    BaseFont bfTableContent = BaseFont.CreateFont(
                            BaseFont.TIMES_ROMAN,
                            BaseFont.CP1252,
                            BaseFont.EMBEDDED);
                    Font fontTableContent = new Font(bfTableContent, 10, Font.UNDEFINED);

                    foreach (var data in vendorMasterdata)
                    {
                        table.AddCell(new PdfPCell(new Phrase(data.Name, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.Address, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.ContactNo, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.Gstno, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.Pan, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.Tan, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.EmailId, fontTableContent)));
                        table.AddCell(new PdfPCell(new Phrase(data.Website, fontTableContent)));
                    }
                    doc.Add(table);
                    doc.Close();
                    //ms.Position = 0;
                    return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "VendorMaster.pdf");
                }
            }
            else
                return View();
        }
        [HttpGet]
        public async Task<IActionResult> ExcelExport()
        {
            var vendordata = await _service.GetAll();
            if (vendordata != null)
            {
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Vendor Master");
                    var currentRow = 1;
                    worksheet.Cell(currentRow, 1).Value = "Name";
                    worksheet.Cell(currentRow, 2).Value = "Address";
                    worksheet.Cell(currentRow, 3).Value = "ContactNo";
                    worksheet.Cell(currentRow, 4).Value = "Gstno";
                    worksheet.Cell(currentRow, 5).Value = "Pan";
                    worksheet.Cell(currentRow, 6).Value = "Tan";
                    worksheet.Cell(currentRow, 7).Value = "EmailId";
                    worksheet.Cell(currentRow, 8).Value = "Website";
                    foreach (var data in vendordata)
                    {
                        currentRow++;
                        worksheet.Cell(currentRow, 1).Value = data.Name;
                        worksheet.Cell(currentRow, 2).Value = data.Address;
                        worksheet.Cell(currentRow, 3).Value = data.ContactNo;
                        worksheet.Cell(currentRow, 4).Value = data.Gstno;
                        worksheet.Cell(currentRow, 5).Value = data.Pan;
                        worksheet.Cell(currentRow, 6).Value = data.Tan;
                        worksheet.Cell(currentRow, 7).Value = data.EmailId;
                        worksheet.Cell(currentRow, 8).Value = data.Website;
                    }

                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        var content = stream.ToArray();
                        return File(
                            content,
                            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                            "VendorMaster.xlsx");
                    }
                }
            }
            else
                return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult>modelAdd(VendorMasterVM vendorMasterVM)
        {
            bool status = false;
            if (vendorMasterVM != null)
            {
                var res = await _service.Insert(vendorMasterVM);
                if (res != null)
                {
                    status = true;
                    return new JsonResult(new { status, res });
                }
            }
            return new JsonResult(new { status });

        }
    }
}
