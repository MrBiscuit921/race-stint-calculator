"use client";

import {useState} from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Clock, Globe} from "lucide-react";
import {Switch} from "@/components/ui/switch";

export default function RaceSchedule() {
  const [raceName, setRaceName] = useState("");
  const [raceClass, setRaceClass] = useState("");
  const [qualifyingTime, setQualifyingTime] = useState("");
  const [qualifyingDate, setQualifyingDate] = useState("");
  const [raceTime, setRaceTime] = useState("");
  const [raceDate, setRaceDate] = useState("");
  const [raceDuration, setRaceDuration] = useState(8);
  const [schedule, setSchedule] = useState("");
  const [useUtc, setUseUtc] = useState(false);

  const generateSchedule = () => {
    // Convert qualifying time to epoch
    let qualifyingEpoch: number;
    if (qualifyingDate && qualifyingTime) {
      if (useUtc) {
        // Treat input as UTC time
        qualifyingEpoch =
          Date.UTC(
            Number.parseInt(qualifyingDate.split("-")[0]),
            Number.parseInt(qualifyingDate.split("-")[1]) - 1,
            Number.parseInt(qualifyingDate.split("-")[2]),
            Number.parseInt(qualifyingTime.split(":")[0]),
            Number.parseInt(qualifyingTime.split(":")[1])
          ) / 1000;
      } else {
        // Use local timezone
        const qualifyingDateTime = new Date(
          `${qualifyingDate}T${qualifyingTime}:00`
        );
        qualifyingEpoch = Math.floor(qualifyingDateTime.getTime() / 1000);
      }
    } else {
      // Use current time if not provided
      qualifyingEpoch = Math.floor(Date.now() / 1000);
    }

    // Convert race time to epoch
    let raceEpoch: number;
    if (raceDate && raceTime) {
      if (useUtc) {
        // Treat input as UTC time
        raceEpoch =
          Date.UTC(
            Number.parseInt(raceDate.split("-")[0]),
            Number.parseInt(raceDate.split("-")[1]) - 1,
            Number.parseInt(raceDate.split("-")[2]),
            Number.parseInt(raceTime.split(":")[0]),
            Number.parseInt(raceTime.split(":")[1])
          ) / 1000;
      } else {
        // Use local timezone
        const raceDateTime = new Date(`${raceDate}T${raceTime}:00`);
        raceEpoch = Math.floor(raceDateTime.getTime() / 1000);
      }
    } else {
      // Use qualifying time + 1 hour if race time not provided
      raceEpoch = qualifyingEpoch + 3600;
    }

    // Generate schedule
    let scheduleText = `# ${raceName || "24 Hours Of Spa Drivers List"}\n`;
    scheduleText += `**${raceClass || "Mclaren 720S GT3"}**\n`;
    scheduleText += `Time: <t:${qualifyingEpoch}:t> Qualifying Driver:\n\n`;

    // Generate hour-by-hour breakdown
    for (let hour = 1; hour <= raceDuration; hour++) {
      const hourStartEpoch = raceEpoch + (hour - 1) * 3600;
      const hourEndEpoch = raceEpoch + hour * 3600;

      scheduleText += `Hour ${hour} - Time: <t:${hourStartEpoch}:t> - <t:${hourEndEpoch}:t> Main Driver: Reserve: Engineer:\n`;
    }

    setSchedule(scheduleText);
  };

  // Format current timezone for display
  const formatTimezone = () => {
    if (useUtc) return "UTC";

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const offset = new Date().getTimezoneOffset();
    const offsetHours = Math.abs(Math.floor(offset / 60));
    const offsetMinutes = Math.abs(offset % 60);
    const offsetSign = offset < 0 ? "+" : "-";

    return `${timezone} (UTC${offsetSign}${offsetHours
      .toString()
      .padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")})`;
  };

  return (
    <div className="container mx-auto py-10 px-4 items-center flex  w-full max-w-6xl">
      <div
        className="grid gap-8 md:grid-cols-2 w-full"
        style={{maxWidth: "90rem"}}>
        <Card className="w-full min-w-[24rem] max-w-[40rem] mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Race Schedule Generator
            </CardTitle>
            <CardDescription>
              Enter race details to generate a schedule with epoch timestamps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2 rounded-lg border p-3 shadow-sm">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {useUtc ? "Using UTC Time" : "Using Local Time"}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({formatTimezone()})
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="timezone-toggle" className="text-xs">
                  UTC
                </Label>
                <Switch
                  id="timezone-toggle"
                  checked={useUtc}
                  onCheckedChange={setUseUtc}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="raceName">Race Name</Label>
              <Input
                id="raceName"
                placeholder="24 Hours Of Spa Drivers List"
                value={raceName}
                onChange={(e) => setRaceName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="raceClass">Race Class</Label>
              <Input
                id="raceClass"
                placeholder="Mclaren 720S GT3"
                value={raceClass}
                onChange={(e) => setRaceClass(e.target.value)}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="qualifyingDate">Qualifying Date</Label>
                <Input
                  id="qualifyingDate"
                  type="date"
                  value={qualifyingDate}
                  onChange={(e) => setQualifyingDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="qualifyingTime">
                  Qualifying Time {useUtc && "(UTC)"}
                </Label>
                <Input
                  id="qualifyingTime"
                  type="time"
                  value={qualifyingTime}
                  onChange={(e) => setQualifyingTime(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="raceDate">Race Date</Label>
                <Input
                  id="raceDate"
                  type="date"
                  value={raceDate}
                  onChange={(e) => setRaceDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="raceTime">Race Time {useUtc && "(UTC)"}</Label>
                <Input
                  id="raceTime"
                  type="time"
                  value={raceTime}
                  onChange={(e) => setRaceTime(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="raceDuration">Race Duration (hours)</Label>
              <Input
                id="raceDuration"
                type="number"
                min="1"
                max="24"
                value={raceDuration}
                onChange={(e) =>
                  setRaceDuration(Number.parseInt(e.target.value))
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={generateSchedule} className="w-full">
              Generate Schedule
            </Button>
          </CardFooter>
        </Card>

        <Card className="w-full min-w-[24rem] max-w-[40rem] mx-auto">
          <CardHeader>
            <CardTitle>Generated Schedule</CardTitle>
            <CardDescription>
              Copy this text to paste in Discord
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Textarea
              className="h-full min-h-[400px] font-mono text-sm"
              value={schedule}
              readOnly
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-2 mt-auto">
            <Button
              onClick={() => navigator.clipboard.writeText(schedule)}
              variant="outline"
              className="w-full">
              Copy to Clipboard
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Discord will automatically convert <code>&lt;t:EPOCH:t&gt;</code>{" "}
              to the viewer's local time
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
