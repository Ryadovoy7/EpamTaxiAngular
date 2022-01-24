using Microsoft.EntityFrameworkCore.Migrations;

namespace EpamTaxiAngular.Data.Migrations
{
    public partial class InitialRoleSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "5d32a8d6-c3de-4d9f-b160-8f42dd2e8f7f", "d08b4ebf-d909-46e6-b6d9-179cc32edc66", "User", "USER" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b885e7ba-f0a4-4553-879b-42190a994271", "cd0af923-5167-4840-a9b1-76e2045b76f7", "Administrator", "ADMINISTRATOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5d32a8d6-c3de-4d9f-b160-8f42dd2e8f7f");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b885e7ba-f0a4-4553-879b-42190a994271");
        }
    }
}
