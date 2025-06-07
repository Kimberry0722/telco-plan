namespace TelcoPlan.API
{
    public class PlanSummaryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string DataLimit { get; set; }
        public string DataSpeed { get; set; }
        public string Currency { get; set; }
        public decimal Price { get; set; }
        public string Validity { get; set; }
    }

}
